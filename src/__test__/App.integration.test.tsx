import { render, screen } from "@testing-library/react"
import { it, expect, vi, beforeEach, describe } from "vitest"
import userEvent from "@testing-library/user-event"
import App from "../App"
import { useInViewport } from "../hooks/useInViewport"

vi.mock("../hooks/useInViewport", () => ({
    useInViewport: vi.fn(() => ({
        ref: vi.fn(),
        visible: true,
    })),
}))

const mockData = {
    results: [
        { id: 1, name: "Rick Sanchez" },
        { id: 2, name: "Morty Smith" },
        { id: 3, name: "Summer Smith" },
    ],
}

const searchMockData = {
    results: [{ id: 2, name: "Morty Smith", status: "Dead", species: "Human", gender: "Male", origin: { name: "Earth" } }],
}

beforeEach(() => {
    vi.restoreAllMocks()

    vi.spyOn(globalThis, "fetch").mockImplementation((url: any) => {
        if (url.includes("name=morty")) {
            return Promise.resolve({
                ok: true,
                json: async () => searchMockData,
            } as any)
        }

        return Promise.resolve({
            ok: true,
            json: async () => mockData,
        } as any)
    })
})

describe("App integration", () => {
    it("shows characters on initial load", async () => {
        render(<App />)

        expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument()
    })

    it("filters characters by name", async () => {
        const user = userEvent.setup()
        render(<App />)

        await screen.findByText("Rick Sanchez")

        await user.type(screen.getByRole("search"), "morty")
        await new Promise((resolve) => setTimeout(resolve, 600))

        expect(await screen.findByText("Morty Smith")).toBeInTheDocument()

        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining("name=morty")
        )
    })

    it("opens character details when clicked", async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.click(
            await screen.findByRole("button", {
                name: "View details of Morty Smith",
            })
        )

        expect(await screen.findByText("Gender:")).toBeInTheDocument()
        expect(screen.getByText("Origin")).toBeInTheDocument()

    })
})
