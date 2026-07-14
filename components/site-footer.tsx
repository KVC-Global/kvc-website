import { cn } from "@/lib/utils"

const CONTACT = {
  person: "Jane Doe",
  phone: "+65 1234 5678",
  address: "Singapore, Singapore",
} as const

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-border bg-[#EDF5E5] text-foreground",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold" style={{ color: "#365462" }}>
            Kenneth &amp; Co.
          </p>
          <p className="text-muted-foreground italic">
            Your Future, Our Mission
          </p>
        </div>

        <address className="not-italic text-muted-foreground">
          <ul className="flex flex-col gap-1 md:items-end">
            <li>{CONTACT.person}</li>
            <li>
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="transition-colors hover:text-foreground"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li>{CONTACT.address}</li>
          </ul>
        </address>
      </div>
    </footer>
  )
}
