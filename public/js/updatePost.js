const updateButton = document.getElementById("update-button")

updateButton.addEventListener("click", () => {
    const updateForm = document.getElementById("updateForm")
    const post = document.getElementById("post")

    updateForm.setAttribute("style", "display:block")
    post.setAttribute("style", "display:none")
})

const updatePostHandler = async (event) => {
    event.preventDefault()

    const title = document.getElementById("title-input").value.trim()
    const content = document.getElementById("content-input").value.trim()

    if (title && content) {
        const response = await fetch(`/api/blog/${parseInt(postId)}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert("Failed to update blog post")
        }
    }
}

updateButton.addEventListener("click", updatePostHandler)