import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// Supabase credentials from env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Debug (remove later)
console.log("Supabase URL:", SUPABASE_URL)
console.log("Supabase Key loaded:", !!SUPABASE_ANON_KEY)

// Grab HTML elements
const button = document.getElementById("getFact")
const factDisplay = document.getElementById("fact")
const newFactInput = document.getElementById("newFact")
const addFactButton = document.getElementById("addFact")
const addMessage = document.getElementById("addMessage")

// Fetch one random fact
async function fetchRandomFact() {
  const { data, error } = await supabase.from("facts").select("id, fact")

  if (error || !data || data.length === 0) {
    factDisplay.innerText = "❌ No facts found 😔"
    console.error("Error fetching random fact:", error)
    return
  }

  const randomFact = data[Math.floor(Math.random() * data.length)].fact
  factDisplay.innerText = randomFact
}

// Button click → Get a fact
button.addEventListener("click", fetchRandomFact)

// Add a new fact
addFactButton.addEventListener("click", async () => {
  const newFact = newFactInput.value.trim()

  if (!newFact) {
    addMessage.innerText = "⚠️ Please enter a fact!"
    return
  }

  const { error } = await supabase.from("facts").insert([{ fact: newFact }])

  if (error) {
    addMessage.innerText = "❌ Error adding fact"
    console.error(error)
  } else {
    addMessage.innerText = "✅ Fact added successfully!"
    newFactInput.value = ""
  }
})
