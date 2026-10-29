import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import ts from "typescript"

// The pure module has no runtime imports, so transpile + data URL keeps this
// check independent of Next.js and Node's experimental type stripping.
const source = await readFile(
  new URL("../lib/misa-attribution.ts", import.meta.url),
  "utf8"
)
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText
const { resolveMisaAttribution } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
)

const DEFAULT = "NV00005"
const SOURCE_IDS = {
  zalo: "8",
  facebook: "9",
  instagram: "10",
  telegram: "11",
  x: "12",
  tiktok: "13",
}
const DEFAULT_ATTRIBUTION = {
  staffCode: DEFAULT,
  utmSource: "",
  sourceId: null,
}

function pair(staffCode, utmSource, sourceId = null) {
  return { staffCode, utmSource, sourceId }
}

test("maps all six verified channels to their CRM source IDs", () => {
  for (const [channel, sourceId] of Object.entries(SOURCE_IDS)) {
    const utmSource = `${channel}/NV00012`
    assert.deepEqual(
      resolveMisaAttribution(null, utmSource),
      pair("NV00012", utmSource, sourceId),
      `${channel} should map to ${sourceId}`
    )
  }
})

test("channel lookup ignores case and surrounding whitespace", () => {
  assert.deepEqual(
    resolveMisaAttribution(undefined, " Zalo /NV00012"),
    pair("NV00012", " Zalo /NV00012", "8")
  )
  assert.deepEqual(
    resolveMisaAttribution(null, "FACEBOOK/NV00001"),
    pair("NV00001", "FACEBOOK/NV00001", "9")
  )
})

test("unknown but syntactically valid channels keep the staff, not a source ID", () => {
  for (const [utmSource, staffCode] of [
    ["partner/NV00012", "NV00012"],
    ["marketing/NV00012", "NV00012"],
    ["google/NV00013", "NV00013"],
    ["facebook page/NV00012", "NV00012"],
    ["constructor/NV00012", "NV00012"],
    ["toString/NV00012", "NV00012"],
    ["__proto__/NV00013", "NV00013"],
    ["hasOwnProperty/NV00012", "NV00012"],
  ]) {
    assert.deepEqual(
      resolveMisaAttribution(null, utmSource),
      pair(staffCode, utmSource),
      `${utmSource} must not invent a source ID`
    )
  }
})

test("direct visits default to the intake owner with no channel", () => {
  assert.deepEqual(resolveMisaAttribution(null, null), DEFAULT_ATTRIBUTION)
  assert.deepEqual(
    resolveMisaAttribution(undefined, undefined),
    DEFAULT_ATTRIBUTION
  )
  assert.deepEqual(resolveMisaAttribution({}, ""), DEFAULT_ATTRIBUTION)
})

test("invalid referrals with no previous attribution default to the intake owner", () => {
  for (const utmSource of [
    "facebook/NV00003",
    "facebook/NV99999",
    "facebook/nv00012",
    "NV00012",
    "/NV00012",
    "facebook",
    "facebook/",
    "MISA SUPPORT",
    "facebook/misa-support",
  ]) {
    assert.deepEqual(
      resolveMisaAttribution(null, utmSource),
      DEFAULT_ATTRIBUTION,
      `utm_source ${JSON.stringify(utmSource)} must not attribute anyone`
    )
  }
})

test("latest valid referral replaces both the owner and the raw channel", () => {
  assert.deepEqual(
    resolveMisaAttribution(
      pair("NV00001", "facebook/NV00001", "9"),
      "instagram/NV00013"
    ),
    pair("NV00013", "instagram/NV00013", "10")
  )
  assert.deepEqual(
    resolveMisaAttribution({ staffCode: "NV00002" }, "zalo/NV00004"),
    pair("NV00004", "zalo/NV00004", "8")
  )
})

test("a new unknown channel replaces the old pair without leaking the old channel", () => {
  assert.deepEqual(
    resolveMisaAttribution(
      pair("NV00001", "facebook/NV00001", "9"),
      "partner/NV00012"
    ),
    pair("NV00012", "partner/NV00012")
  )
})

test("missing or invalid referrals never overwrite a valid stored pair", () => {
  const previous = pair("NV00001", "facebook/NV00001", "9")
  for (const utmSource of [
    null,
    undefined,
    "",
    "facebook",
    "facebook/",
    "/",
    "NV00012",
    "/NV00012",
    "facebook/NV00003",
    "facebook/NV99999",
    "instagram/nv00012",
    "instagram/NV00012/extra",
    "facebook/MISA SUPPORT",
    "misa-support",
  ]) {
    assert.deepEqual(
      resolveMisaAttribution(previous, utmSource),
      previous,
      `utm_source ${JSON.stringify(utmSource)} must keep the stored pair`
    )
  }
})

test("staff codes stay case-sensitive while the channel is normalized", () => {
  const previous = pair("NV00001", "facebook/NV00001", "9")
  assert.deepEqual(
    resolveMisaAttribution(previous, "facebook/nv00012"),
    previous
  )
  assert.deepEqual(
    resolveMisaAttribution(previous, "facebook/NV00012 "),
    previous
  )
})

test("an incoherent stored pair keeps the owner and drops the channel", () => {
  for (const [staffCode, utmSource] of [
    ["NV00012", "facebook/NV00001"],
    ["NV00001", "facebook/NV00012"],
    ["NV00012", "NV00012"],
    ["NV00012", "facebook/nv00012"],
    ["NV00012", "facebook/NV00012/extra"],
    ["NV00012", "/NV00012"],
    ["NV00012", "facebook/MISA SUPPORT"],
  ]) {
    assert.deepEqual(
      resolveMisaAttribution({ staffCode, utmSource }, null),
      pair(staffCode, ""),
      `${staffCode} must not inherit ${utmSource}`
    )
  }
})

test("a coherent stored pair survives reload", () => {
  assert.deepEqual(
    resolveMisaAttribution(
      { staffCode: "NV00012", utmSource: "zalo/NV00012" },
      null
    ),
    pair("NV00012", "zalo/NV00012", "8")
  )
  assert.deepEqual(
    resolveMisaAttribution(
      { staffCode: "NV00013", utmSource: "partner/NV00013" },
      null
    ),
    pair("NV00013", "partner/NV00013")
  )
})

test("code-only storage keeps the owner with a blank channel", () => {
  for (const previous of [
    { staffCode: "NV00002" },
    { staffCode: "NV00002", utmSource: null },
    { staffCode: "NV00002", utmSource: undefined },
    { staffCode: "NV00002", utmSource: "" },
  ]) {
    assert.deepEqual(
      resolveMisaAttribution(previous, null),
      pair("NV00002", "")
    )
  }
})

test("invalid stored staff codes default without inventing a channel", () => {
  for (const staffCode of [
    null,
    undefined,
    "",
    "garbage",
    "NV00003",
    "NV99999",
    " NV00001 ",
    "<script>alert(1)</script>",
  ]) {
    assert.deepEqual(
      resolveMisaAttribution({ staffCode }, null),
      DEFAULT_ATTRIBUTION
    )
  }
  assert.deepEqual(
    resolveMisaAttribution(
      { staffCode: "NV00003", utmSource: "facebook/NV00005" },
      null
    ),
    DEFAULT_ATTRIBUTION
  )
  assert.deepEqual(
    resolveMisaAttribution(
      { staffCode: "NV00003", utmSource: "facebook/NV00012" },
      null
    ),
    DEFAULT_ATTRIBUTION
  )
})

test("a stored channel alone never promotes another owner", () => {
  assert.deepEqual(
    resolveMisaAttribution({ utmSource: "zalo/NV00013" }, null),
    DEFAULT_ATTRIBUTION
  )
  assert.deepEqual(
    resolveMisaAttribution({ staffCode: "", utmSource: "zalo/NV00013" }, null),
    DEFAULT_ATTRIBUTION
  )
})

test("an explicit source for the default owner is still retained", () => {
  assert.deepEqual(
    resolveMisaAttribution(null, "x/NV00005"),
    pair("NV00005", "x/NV00005", "12")
  )
})

test("navigation and reload retain the latest valid pair", () => {
  let current = null
  const visit = (utmSource) => {
    current = resolveMisaAttribution(current, utmSource)
    return current
  }

  visit("facebook/NV00001")
  visit(null)
  visit("facebook/NV00003")
  assert.deepEqual(
    visit("instagram/NV00012"),
    pair("NV00012", "instagram/NV00012", "10")
  )
  assert.deepEqual(visit(null), pair("NV00012", "instagram/NV00012", "10"))
  assert.deepEqual(
    visit("tiktok/NV00013"),
    pair("NV00013", "tiktok/NV00013", "13")
  )
  assert.deepEqual(
    visit("tiktok/NV00001/extra"),
    pair("NV00013", "tiktok/NV00013", "13")
  )
  assert.deepEqual(visit(""), pair("NV00013", "tiktok/NV00013", "13"))
})
