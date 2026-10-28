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
const { resolveStaffCode } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
)

const DEFAULT = "NV00005"
const INACTIVE_CODES = [
  "NV00000",
  "NV00003",
  "NV00006",
  "NV00009",
  "NV00011",
  "NV00014",
  "NV01",
]

test("defaults when neither storage nor URL has an active code", () => {
  assert.equal(resolveStaffCode(null, null), DEFAULT)
  assert.equal(resolveStaffCode(undefined, undefined), DEFAULT)
  assert.equal(resolveStaffCode("", ""), DEFAULT)
})

test("accepts only nonempty channel/CODE utm sources", () => {
  assert.equal(resolveStaffCode(null, "facebook/NV00001"), "NV00001")
  assert.equal(resolveStaffCode(null, "zalo/NV00013"), "NV00013")
  assert.equal(resolveStaffCode(null, "facebook page/NV00012"), "NV00012")
})

test("bare and slash-led codes never reassign the owner", () => {
  for (const source of ["NV00012", "/NV00012", "   /NV00012", "\t/NV00012"]) {
    assert.equal(resolveStaffCode("NV00001", source), "NV00001")
    assert.equal(resolveStaffCode(null, source), DEFAULT)
  }
  assert.equal(resolveStaffCode("NV00001", "facebook/NV00012"), "NV00012")
})

test("latest valid source overrides a previously valid code", () => {
  assert.equal(resolveStaffCode("NV00001", "facebook/NV00012"), "NV00012")
  assert.equal(resolveStaffCode("NV00004", "zalo/NV00013"), "NV00013")
})

test("missing or invalid source never overwrites a valid code", () => {
  for (const source of [
    null,
    undefined,
    "",
    "facebook",
    "facebook/",
    "/",
    "NV01",
    "nv00001",
    "NV00001x",
    "NV 00001",
    "NV00001",
    "/NV00001",
    "   /NV00001",
    "facebook/NV99999",
    "facebook/NV00001/extra",
    "facebook/NV00001/",
    "a/b/NV00001",
  ]) {
    assert.equal(
      resolveStaffCode("NV00002", source),
      "NV00002",
      `utm_source ${JSON.stringify(source)} should keep NV00002`
    )
  }
})

test("inactive, disabled, and unknown codes resolve to the default", () => {
  for (const code of INACTIVE_CODES) {
    assert.equal(resolveStaffCode(null, code), DEFAULT)
    assert.equal(resolveStaffCode(null, `facebook/${code}`), DEFAULT)
  }
})

test("MISA SUPPORT values never become attribution", () => {
  for (const source of [
    "MISA SUPPORT",
    "misa-support",
    "facebook/MISA SUPPORT",
    "facebook/misa-support",
  ]) {
    assert.equal(resolveStaffCode("NV00010", source), "NV00010")
  }
})

test("tampered or inactive stored values are ignored", () => {
  for (const stored of [
    null,
    "",
    "garbage",
    "NV00003",
    "NV99999",
    "facebook/NV00006",
    "facebook/NV00001",
    " NV00001 ",
    "<script>alert(1)</script>",
  ]) {
    assert.equal(resolveStaffCode(stored, null), DEFAULT)
  }
  assert.equal(resolveStaffCode("NV00003", "facebook/NV00012"), "NV00012")
})

test("latest valid code wins across a navigation sequence", () => {
  let current = null
  for (const source of [
    "facebook/NV00001",
    "facebook/NV00003",
    null,
    "facebook/NV00013",
    "facebook/NV00002",
  ]) {
    current = resolveStaffCode(current, source)
  }
  assert.equal(current, "NV00002")
  assert.equal(resolveStaffCode(current, null), "NV00002")
})
