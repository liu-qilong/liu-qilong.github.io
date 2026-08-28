export function getIconLinks (post) {
    return Object.entries(post).flatMap(([key, url]) => {
        if (typeof url !== 'string') {
            return []
        }

        if (key === 'link') {
            return [['link', url]]
        }

        if (key.startsWith('link_')) {
            return [[key.slice('link_'.length), url]]
        }

        return []
    })
}
