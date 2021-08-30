
export function setAuthSession(data) {
    sessionStorage.setItem('auth_data', JSON.stringify(data))
}

export function updateAuthSession(data) {
    const updatedAuth = Object.assign(getAuthSession(), data)
    sessionStorage.setItem('auth_data', JSON.stringify(updatedAuth))
}

export function getAuthSession() {
    const auth_data = sessionStorage.getItem('auth_data')
    if (auth_data) {
        return JSON.parse(auth_data)
    } else return {}
}


export function removeAuthAttr() {
    sessionStorage.removeItem('auth_data')
}

export async function isAuthenticated() {
    const authSession = getAuthSession()
    if (authSession['accessToken']) {
        return true
    }
    return false
}

export function logout() {
    removeAuthAttr()
}