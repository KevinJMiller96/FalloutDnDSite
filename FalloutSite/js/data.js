const questList = document.getElementById("questList");
const questDetails = document.getElementById("questDetails");

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function normalizeQuest(rawQuest, fallbackIndex) {
    const questName = rawQuest.Quest_Name || rawQuest.quest_name || rawQuest.QuestName || rawQuest.questName || `Quest ${fallbackIndex + 1}`;
    const questDescription = rawQuest.Quest_Description || rawQuest.quest_description || rawQuest.QuestDescription || rawQuest.questDescription || "No description provided.";
    const questId = rawQuest.id || rawQuest.quest_id || rawQuest.Quest_ID || rawQuest.QuestId || `quest-${fallbackIndex + 1}`;

    return {
        id: String(questId),
        name: questName,
        description: questDescription
    };
}

function renderQuestDescription(quest) {
    if (!questDetails) return;

    questDetails.innerHTML = `
        <h3>${escapeHtml(quest.name)}</h3>
        <p>${escapeHtml(quest.description)}</p>
    `;
}

function selectQuest(questButton, quests) {
    if (!questButton) return;

    const buttons = Array.from(document.querySelectorAll(".quest-item"));
    buttons.forEach(button => button.classList.remove("selected"));
    questButton.classList.add("selected");

    const selectedQuest = quests.find(quest => quest.id === questButton.dataset.questId);
    if (selectedQuest) {
        renderQuestDescription(selectedQuest);
    }
}

function renderQuestList(quests) {
    if (!questList) return;

    questList.innerHTML = quests
        .map(quest => `
            <button class="quest-item" data-quest-id="${escapeHtml(quest.id)}" type="button">
                <span class="square" aria-hidden="true"></span>
                <span class="quest-name">${escapeHtml(quest.name)}</span>
            </button>
        `)
        .join("");

    const buttons = Array.from(document.querySelectorAll(".quest-item"));
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            selectQuest(button, quests);
        });
    });

    selectQuest(buttons[0], quests);
}

function getSupabaseCredentials() {
    return {
        url: "https://uhuhsfmkgktnchazuoey.supabase.co",
        anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVodWhzZm1rZ2t0bmNoYXp1b2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0Nzg4NTMsImV4cCI6MjA4ODA1NDg1M30.l6J6fod4UAYVvJ5-lVRJJDyrPBc82OjstxQKEhSU-3I"
    };
}

async function loadQuests() {
    if (!questList || !questDetails || !window.supabase?.createClient) return;

    questList.textContent = "Loading quests...";
    questDetails.textContent = "Select a quest to view details.";

    try {
        const { url, anonKey } = getSupabaseCredentials();
        const supabase = window.supabase.createClient(url, anonKey);

        const { data, error } = await supabase
            .from("Quests")
            .select("Quest_Name, Quest_Description")
            .order("Quest_Name", { ascending: true });

        if (error) throw error;

        const quests = (data || []).map(normalizeQuest);

        if (quests.length === 0) {
            questList.textContent = "No quests found.";
            questDetails.textContent = "Add quests to the database to see quest details here.";
            return;
        }

        renderQuestList(quests);
    } catch (error) {
        console.error("Unable to load quests", error);
        questList.textContent = "Could not load quests from Supabase.";
        questDetails.textContent = "Please try again later.";
    }
}

window.centerDataActiveButton = function centerDataActiveButton() {
    // No-op: maintained for compatibility with the existing navigation handler.
};

loadQuests();
