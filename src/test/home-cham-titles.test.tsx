import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

function renderHome() {
  const queryClient = new QueryClient();
  const router = createRouter({ routeTree, context: { queryClient } });
  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

// The "Hành trình 5 CHẠM" card grid on the homepage must use the exact five
// Chạm names and keep its per-card "Khám phá" links pointing at the right pages.
describe("Homepage – Hành trình 5 CHẠM cards", () => {
  it("shows the exact five Chạm titles and no old names", async () => {
    renderHome();
    await screen.findByRole("heading", { name: "CHẠM 1 – LẮNG NGHE" });

    for (const title of [
      "CHẠM 1 – LẮNG NGHE",
      "CHẠM 2 – THẤU HIỂU",
      "CHẠM 3 – VỮNG VÀNG",
      "CHẠM 4 – KẾT NỐI",
      "CHẠM 5 – ĐIỂM TỰA",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }

    for (const oldName of ["NHẬN DIỆN", "RÈN LUYỆN", "TÌM HỖ TRỢ"]) {
      expect(screen.queryByText(oldName)).toBeNull();
    }
  });

  it("keeps five Khám phá links pointing at their Chạm pages", async () => {
    renderHome();
    await screen.findByRole("heading", { name: "CHẠM 1 – LẮNG NGHE" });

    const hrefs = screen
      .getAllByRole("link", { name: "Khám phá" })
      .map((link) => link.getAttribute("href"));

    expect(hrefs).toEqual(["/lang-nghe", "/hieu-minh", "/vung-vang", "/ket-noi", "/diem-tua"]);
  });
});
