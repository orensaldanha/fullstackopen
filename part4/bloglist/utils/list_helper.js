const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesReducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(likesReducer, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) 
        return {}
    const reducer = (mostLikes, blog) => blog.likes > mostLikes.likes ? blog : mostLikes
    return blogs.reduce(reducer)
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}