const newPostHandler = async (event) => {
    event.preventDefault()

    const title = document.getElementById("title-input").value.trim()
    const content = document.getElementById("content-input").value.trim()

    if (title && content) {
        const response = await fetch("/api/blog", {
            method: Post,
            body: JSON.stringify({ title, content}),
            headers: { "Content-Type": "application/json" }
        })

        const userData = await fetch("/api/user")
        const userId = userData.id

        if (response.ok) {
            document.location.replace(`/dashboard/${userId}`)
        } else {
            alert("Failed to create new blog post")
        }
    }
}