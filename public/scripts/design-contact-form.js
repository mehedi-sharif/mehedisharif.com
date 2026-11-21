for (const form of document.querySelectorAll("form[data-design-contact]")) {
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector(".label");
  const status = form.querySelector('[role="status"]');
  const originalLabel = label.textContent;
  const pageStatus = new URLSearchParams(location.search);
  if (form.id === "cForm" && pageStatus.has("sent")) {
    status.textContent = form.dataset.success;
    status.classList.add("ok");
  } else if (form.id === "cForm" && pageStatus.has("error")) {
    status.textContent = form.dataset.error;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    const fields = new FormData(form);
    const name = String(fields.get("full_name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();
    status.classList.remove("ok");
    if (!name || !email || !message) {
      status.textContent = form.dataset.error;
      return;
    }

    button.disabled = true;
    form.setAttribute("aria-busy", "true");
    label.textContent = form.dataset.sending;
    status.textContent = "";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website: fields.get("website") ?? "",
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error("Submission failed");
      form.reset();
      status.textContent = form.dataset.success;
      status.classList.add("ok");
    } catch {
      status.textContent = form.dataset.error;
    } finally {
      button.disabled = false;
      form.removeAttribute("aria-busy");
      label.textContent = originalLabel;
    }
  });
}
