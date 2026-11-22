// Reusable button. Two variants from design.md: "primary" (the single orange commit action) and "text" (everything quieter).
// Tailwind finds classes by reading source as plain text, so every class is written out in full (never built with "bg-"+color).
const variants={
    primary:"h-14 px-6 bg-accent text-on-accent text-button active:scale-95 disabled:bg-surface-muted disabled:text-ink-subtle disabled:active:scale-100",
    text:"min-h-touch px-4 text-ink text-button-sm active:bg-surface-muted disabled:text-ink-subtle"
}

export default function Button({children,onClick,variant="primary",disabled=false,type="button"}){
    return(
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={"inline-flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink "+variants[variant]}
        >
            {children}
        </button>
    )
}
