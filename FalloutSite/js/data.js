const dataSubnav = document.querySelector(".data-subnav");
const dataTrack = document.querySelector(".data-subnav-track");
const questPanel = document.getElementById("quest");

function getDataButtons() {
    return dataTrack ? Array.from(dataTrack.querySelectorAll("button[data-quest-id]")) : [];
}

function centerDataButton(button) {
    if (!dataSubnav || !dataTrack || !button) return;

    const subnavWidth = dataSubnav.clientWidth;
    const trackWidth = dataTrack.scrollWidth;
    const maxNegativeOffset = Math.min(0, subnavWidth - trackWidth);

    const targetCenter = button.offsetLeft + (button.offsetWidth / 2);
    const dataNavButton = document.querySelector('.nav button[data-page="data"]');
    const subnavRect = dataSubnav.getBoundingClientRect();
    const navRect = dataNavButton?.getBoundingClientRect();

    const desiredCenter = navRect
        ? (navRect.left + (navRect.width / 2)) - subnavRect.left
        : subnavWidth / 2;

    const centeredOffset = desiredCenter - targetCenter;
    const boundedOffset = Math.max(maxNegativeOffset, Math.min(0, centeredOffset));

    dataTrack.style.setProperty("--slider-offset", `${boundedOffset}px`);
}

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

function renderQuestSubnav(quests) {
    if (!dataTrack) return;

    dataTrack.innerHTML = quests
        .map((quest, index) => `
            <button class="${index === 0 ? "active" : ""}" data-quest-id="${escapeHtml(quest.id)}">${escapeHtml(quest.name)}</button>
        `)
        .join("");
}

function renderQuestDetails(quest) {
    if (!questPanel || !quest) return;

    questPanel.innerHTML = `
        <div class="quest-entry">
            <h3>${escapeHtml(quest.name)}</h3>
            <p>${escapeHtml(quest.description)}</p>
        </div>
    `;
}

function wireQuestSubnav(quests) {
    const buttons = getDataButtons();

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedQuest = quests.find(quest => quest.id === button.dataset.questId);
            if (selectedQuest) {
                renderQuestDetails(selectedQuest);
            }

            centerDataButton(button);
        });
    });
}

function getSupabaseCredentials() {
    const runtimeConfig = window.__SUPABASE__ || {};

    return {
        url: runtimeConfig.url || "https://uhuhsfmkgktnchazuoey.supabase.co",
        anonKey: runtimeConfig.anonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVodWhzZm1rZ2t0bmNoYXp1b2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0Nzg4NTMsImV4cCI6MjA4ODA1NDg1M30.l6J6fod4UAYVvJ5-lVRJJDyrPBc82OjstxQKEhSU-3I"
    };
}

async function loadQuests() {
    if (!questPanel || !window.supabase?.createClient) return;

    questPanel.textContent = "Loading quests...";

    try {
        const { url, anonKey } = getSupabaseCredentials();
        const supabase = window.supabase.createClient(url, anonKey);

        const { data, error } = await supabase
            .from("Quests")
            .select("id, quest_id, Quest_ID, QuestId, Quest_Name, quest_name, QuestName, questName, Quest_Description, quest_description, QuestDescription, questDescription")
            .order("Quest_Name", { ascending: true });

        if (error) throw error;

        const quests = (data || []).map(normalizeQuest);

        if (quests.length === 0) {
            if (dataTrack) {
                dataTrack.innerHTML = '<button class="active" disabled>NO QUESTS</button>';
            }
            questPanel.textContent = "No quests found.";
            return;
        }

        renderQuestSubnav(quests);
        renderQuestDetails(quests[0]);
        wireQuestSubnav(quests);
        centerDataButton(getDataButtons()[0]);
    } catch (error) {
        console.error("Unable to load quests", error);
        if (dataTrack) {
            dataTrack.innerHTML = '<button class="active" disabled>QUESTS</button>';
        }
        questPanel.textContent = "Could not load quests from Supabase.";
    }
}

window.centerDataActiveButton = function centerDataActiveButton() {
    centerDataButton(document.querySelector(".data-subnav button.active"));
};

window.addEventListener("resize", window.centerDataActiveButton);
loadQuests();
