function showToast(title, message, type = "info") {
    const container = document.getElementById("toast-container");
    const template = document.getElementById("toast-template");

    if (!template || !container) {
        return;
    }
    const toastEl = template.cloneNode(true);
    toastEl.id = ""; 
    toastEl.classList.add(`text-bg-${type}`);

    toastEl.querySelector(".toast-title").innerText = title;
    toastEl.querySelector(".toast-body").innerText = message;

    container.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}