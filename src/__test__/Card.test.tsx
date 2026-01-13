
import { render, screen, fireEvent } from "@testing-library/react"
import { it, expect, vi } from "vitest"
import { Card } from "../components/Card"
import { useInViewport } from "../hooks/useInViewport"

vi.mock("../hooks/useInViewport", () => ({
    useInViewport: vi.fn(),
}))

const baseProps = {
    image: "rick.png",
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: { name: "Earth" },
    onClick: vi.fn(),
}

it("shows loader when card is not in viewport", () => {
    (useInViewport as any).mockReturnValue({
        ref: vi.fn(),
        visible: false,
    })

    render(<Card {...baseProps} />)

    expect(
        screen.getByRole("status", { name: "loading" })
    ).toBeInTheDocument()

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
})

it("shows image when card is in viewport", () => {
    (useInViewport as any).mockReturnValue({
        ref: vi.fn(),
        visible: true,
    })

    render(<Card {...baseProps} />)

    expect(screen.getByRole("img")).toBeInTheDocument()
})

it("shows loader when isLoading is true even if visible", () => {
    ; (useInViewport as any).mockReturnValue({
        ref: vi.fn(),
        visible: true,
    })

    render(<Card {...baseProps} isLoading />)

    expect(
        screen.getByRole("status", { name: "loading" })
    ).toBeInTheDocument()
})

it("renders character info when not loading", () => {
    ; (useInViewport as any).mockReturnValue({
        ref: vi.fn(),
        visible: true,
    })

    render(<Card {...baseProps} />)

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument()
    expect(screen.getByText("Alive – Human")).toBeInTheDocument()
})

it("calls onClick when clicked", () => {
    const onClick = vi.fn()

        ; (useInViewport as any).mockReturnValue({
            ref: vi.fn(),
            visible: true,
        })

    render(<Card {...baseProps} onClick={onClick} />)

    fireEvent.click(
        screen.getByRole("button", { name: "View details of Rick Sanchez" })
    )

    expect(onClick).toHaveBeenCalledOnce()
})

it("calls onClick when pressing Enter", () => {
    const onClick = vi.fn();

    (useInViewport as any).mockReturnValue({
        ref: vi.fn(),
        visible: true,
    })

    render(<Card {...baseProps} onClick={onClick} />)

    const card = screen.getByRole("button", {
        name: "View details of Rick Sanchez",
    })

    fireEvent.keyDown(card, { key: "Enter" })

    expect(onClick).toHaveBeenCalledOnce()
})
