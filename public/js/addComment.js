const addCommentButton = document.getElementById("add-comment-button")

addCommentButton.addEventListener("click", () => {
    const commentBlock = document.getElementById("commentBlock")

    commentBlock.setAttribute("style", "display:block")
})

const newCommentHandler = async (event) => {
    event.preventDefault()

    const content = document.getElementById("comment-input").value.trim()

    if (content) {
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.reload()
            console.log(response)
            // const comment = await response.json(); // get the newly created comment from the response

            // const commentsContainer = document.getElementById("comments-container");
            // const newCommentElem = document.createElement("div");
            // newCommentElem.className = "card";
            // newCommentElem.innerHTML = `
            //   <div class="card-content">
            //     <div class="media-content">
            //       <p class="subtitle is-6" style="font-size: 17px">
            //         Posted by @${comment.user.username} ${formatDate(
            //   comment.createdAt
            // )}
            //       </p>
            //     </div>
            //     <div class="content">${comment.content}</div>
            //   </div>
            // `;
            // commentsContainer.appendChild(newCommentElem);
      
            // document.getElementById("comment-input").value = ""; // clear the input field
            // document.getElementById("commentBlock").style.display = "none"; // hide the comment form
        } else {
            alert("Failed to create new comment")
        }
    }
}

document.getElementById("create-button").addEventListener("click", newCommentHandler)