import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCk9vUV2hwU8UwdnVJl9q0UlqQIIqxxA_A",
    authDomain: "faastshop.firebaseapp.com",
    projectId: "faastshop",
    storageBucket: "faastshop.firebasestorage.app",
    messagingSenderId: "710859153646",
    appId: "1:710859153646:web:919cc9223a0ecbaa1953ff",
    measurementId: "G-E91IF0R0CG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userBox = document.getElementById("userBox");
const userPhoto = document.getElementById("userPhoto");
const userName = document.getElementById("userName");

if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Erro no login:", error);
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    });
}

onAuthStateChanged(auth, (user) => {
    if (!loginBtn || !userBox) return;

    if (user) {
        loginBtn.classList.add("hidden");
        userBox.classList.remove("hidden");

        if (userPhoto) userPhoto.src = user.photoURL;
        if (userName) userName.textContent = user.displayName;
    } else {
        loginBtn.classList.remove("hidden");
        userBox.classList.add("hidden");
    }
});

const searchInput = document.getElementById("searchInput");
const productCard = document.querySelector(".product-card");
const noResults = document.getElementById("noResults");

if (searchInput && productCard && noResults) {
    searchInput.addEventListener("input", () => {
        const search = searchInput.value.toLowerCase().trim();
        const productName = productCard.getAttribute("data-name").toLowerCase();

        if (productName.includes(search)) {
            productCard.style.display = "grid";
            noResults.style.display = "none";
        } else {
            productCard.style.display = "none";
            noResults.style.display = "block";
        }
    });
}

const modal = document.getElementById("productModal");

window.abrirDetalhes = function () {
    if (modal) modal.classList.add("active");
};

window.fecharDetalhes = function () {
    if (modal) modal.classList.remove("active");
};

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            window.fecharDetalhes();
        }
    });
}