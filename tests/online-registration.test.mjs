import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import test from "node:test"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import ts from "typescript"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime.js"
import { imageConfigDefault } from "next/dist/shared/lib/image-config.js"
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js"

function loadTs(relativePath) {
  const filename = fileURLToPath(new URL(relativePath, import.meta.url))
  const require = createRequire(filename)
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText
  const loaded = { exports: {} }
  new Function("require", "module", "exports", compiled)(
    (specifier) => {
      if (!specifier.startsWith("@/")) return require(specifier)
      const path = `../${specifier.slice(2)}`
      if (path.endsWith(".json")) {
        return require(fileURLToPath(new URL(path, import.meta.url)))
      }
      const extension = [".ts", ".tsx"].find((ext) =>
        existsSync(new URL(path + ext, import.meta.url))
      )
      return loadTs(path + extension)
    },
    loaded,
    loaded.exports
  )
  return loaded.exports
}

const { OnlineOthm } = loadTs("../components/online-othm.tsx")
const { OnlineQualifi } = loadTs("../components/online-qualifi.tsx")
const { OnlineWolverhampton } = loadTs("../components/online-wolverhampton.tsx")
const { default: nextConfig } = loadTs("../next.config.ts")
const legacy = {
  title: "Legacy registration",
  steps: [{ title: "Legacy step", description: "Legacy instructions" }],
}
const cms = {
  title: "Đăng ký từ Studio",
  steps: [
    { title: "Gửi bằng cấp", description: "Chuẩn bị hồ sơ xét tuyển." },
    { title: "Nhận kết quả", description: "Xác nhận lộ trình học." },
  ],
}

function renderPage(Component, data, pathname = "/vi") {
  return renderToStaticMarkup(
    React.createElement(
      ImageConfigContext.Provider,
      { value: { ...imageConfigDefault, ...nextConfig.images } },
      React.createElement(
        PathnameContext.Provider,
        { value: pathname },
        React.createElement(Component, { data })
      )
    )
  )
}

function registration(Component, data) {
  const html = renderPage(Component, data)
  return [...html.matchAll(/<section\b[\s\S]*?<\/section>/g)]
    .map(([section]) => section)
    .find(
      (section) => section.includes(cms.title) || section.includes(legacy.title)
    )
}

for (const Component of [OnlineOthm, OnlineQualifi, OnlineWolverhampton]) {
  test(`${Component.name}: renders Studio registration title and ordered steps ahead of legacy content`, () => {
    const section = registration(Component, {
      stepsSection: cms,
      processSection: legacy,
    })
    assert.ok(section?.includes(cms.title))
    assert.deepEqual(
      [...section.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map(([, title]) => title),
      cms.steps.map((step) => step.title)
    )
    for (const step of cms.steps) assert.ok(section.includes(step.description))
    assert.ok(!section.includes(legacy.title))
  })

  test(`${Component.name}: keeps the generic program source when the dedicated section is absent`, () => {
    const section = registration(Component, { processSection: legacy })
    assert.ok(section?.includes(legacy.steps[0].title))
    assert.ok(section.includes(legacy.steps[0].description))
  })
}

for (const [locale, subjects, entry] of [
  ["en", "Subjects", "Entry requirements"],
  ["vi", "Môn học", "Điều kiện đầu vào"],
]) {
  test(`QUALIFI: ${locale} program labels and CMS content reach desktop and mobile`, () => {
    const html = renderPage(
      OnlineQualifi,
      {
        programsSection: {
          title: "QUALIFI Programs",
          items: [
            {
              name: "CMS qualification",
              duration: "8 months",
              startDates: "September",
              subjects: ["CMS subject"],
              entryRequirements: "CMS admission requirement",
            },
          ],
        },
      },
      `/${locale}/khoa-hoc-online/qualifi`
    )
    const section = [...html.matchAll(/<section\b[\s\S]*?<\/section>/g)]
      .map(([section]) => section)
      .find((section) => section.includes("QUALIFI Programs"))
    const labels = [...section.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/g)].map(
      ([, content]) => content.replace(/<[^>]*>/g, "")
    )
    assert.deepEqual(labels, [subjects, entry, subjects, entry])
    for (const content of [
      "CMS subject",
      "CMS admission requirement",
      "8 months",
      "September",
    ]) {
      assert.equal(section.split(content).length - 1, 2)
    }
  })
}
