unction executeCommand(event) {
    if (event.key === "Enter") {
        const input = document.getElementById("user-input").value;
        const output = document.querySelector(".output");

        if (input.toLowerCase() === "help") {
            output.innerHTML += <p class="animate-text">Commands:</p>;
            output.innerHTML += <p class="animate-text">- help: View available commands</p>;
            output.innerHTML += <p class="animate-text">- projects: See Xylaz' most recent projects</p>;
            output.innerHTML += <p class="animate-text">- contact: Get contact info</p>;
        } else if (input.toLowerCase() === "projects") {
            output.innerHTML += <p class="animate-text">Xylaz' recent projects:</p>;
            output.innerHTML += <p class="animate-text">1. Project A: Innovating technology</p>;
            output.innerHTML += <p class="animate-text">2. Project B: Advanced learning platform</p>;
        } else if (input.toLowerCase() === "contact") {
            output.innerHTML += <p class="animate-text">Contact Xylaz at: contact@xylaz.xyz</p>;
        } else {
            output.innerHTML += <p class="animate-text">Unknown command. Type 'help' for the list of commands.</p>;
        }

        document.getElementById("user-input").value = "";
        window.scrollTo(0, document.body.scrollHeight);
    }
}
