export const API = process.env.REACT_APP_SERVER_API;

// windows UP

export const windowTop = () => {
   window.scrollTo({ top: 0 , behavior: "instant"})
}

// USERS

export const register = async(body) => {
    return await fetch(`${API}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
}

export const login = async(body) => {
    return await fetch(`${API}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
}

export const signout = async(next) => {
    if(typeof window !== 'undefined') {
        await toggleBulb(undefined, false)
        await localStorage.removeItem('modeview')
        await localStorage.removeItem('jwt')
        await next()
        await fetch(`${API}/user/signout`, {
            method: 'GET',
        })
        .then(response => response.json())
    }
}

export const authenticate = (data, redirect) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        windowTop()
        redirect()
    }
}

export const Authenticated = () => {
    if(typeof window === 'undefined') {
        return false
    } else {
        if(localStorage.getItem('jwt')) {
            return JSON.parse(localStorage.getItem('jwt'))
        } else {
            return false
        }
    }
}

// No New Anymore

export const noNew = async(set, id, token) => {
    return await fetch(`${API}/user/choose/course/${id}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        authenticate({...Authenticated(), isNewUser: undefined}, () => set(data.isNewUser))
    })
    .catch(error => console.error(error))
}

// Classes

export const CurrentModule = async(set, token, progress, setSubscription, setCoursesDrop, history) => {
    return await fetch(`${API}/user/get/current`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(async(data) => {
        if(data?.success === false) {
            await localStorage.removeItem('modeview')
            await localStorage.removeItem('jwt')
            history.push('/')
            await fetch(`${API}/user/signout`, {
                method: 'GET',
            })
        } else {

            if (data?.isNewUser) {
                set(true)
                authenticate({...Authenticated(), isNewUser: true}, () => ([]))
            } else {
                set(data)
                progress(data)
                if(setCoursesDrop) {
                    setCoursesDrop(data.courses)
                }
                if(setSubscription) {
                    setSubscription(data.subscription)
                }
            }

        }
    })
    .catch(error => {
        console.log('oi')
        console.error('OI', error)
    })
}

// Current Module

export const RequestModules = async(set, token) => {
    return await fetch(`${API}/user/modules/get`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data?.isNewUser) {
            set(true)
            authenticate({...Authenticated(), isNewUser: true}, () => ([]))
        } else {
            set(data.module)
        }
    })
    .catch(error => console.error(error))
}

// Update Module or Lessons

export const UpdateModule = async(set, token, module) => {
    return await fetch(`${API}/user/update/module`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            module: module
        })
    })
    .then(response => response.json())
    .then(data => {
        set(data)
    })
    .catch(error => console.error(error))
}

export const UpdateLesson = async(set, token, lesson, current, lessonNumber, module) => {
    return await fetch(`${API}/user/update/current`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            lesson: lesson,
            module: module
        })
    })
    .then(response => response.json())
    .then(lesson => {
        set({...current, lesson: lesson.lesson, lessonNumber})
    })
    .catch(error => console.error(error))
}

export const NextModule = async(set, token, module) => {
    return await fetch(`${API}/user/next/module`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            module: module
        })
    })
    .then(response => response.json())
    .then(data => {
        set(data)
    })
    .catch(error => console.error(error))
}

// Get Courses

export const RequestCourses = async(set, history) => {
    return await fetch(`${API}/user/course/get`)
    .then(response => response.json())
    .then(async(data) => {
        if(data?.success === false) {
            await localStorage.removeItem('modeview')
            await localStorage.removeItem('jwt')
            history.push('/')
            await fetch(`${API}/user/signout`, {
                method: 'GET',
            })
        } else {
            set(data.course)
        }
    })
    .catch(error => console.error(error))
}

// Get Prices

export const RequestPrices = async(set, setMonth, setPrice, setIdValue, token, history) => {
    return await fetch(`${API}/price/course`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(async(data) => {
        if(data?.success === false) {
            await localStorage.removeItem('modeview')
            await localStorage.removeItem('jwt')
            history.push('/')
            await fetch(`${API}/user/signout`, {
                method: 'GET',
            })
        } else {
            set(data.prices)
            setMonth(data.prices[0].months)
            setPrice(data.prices[0].value)
            setIdValue(data.prices[0]._id)
        }
    })
    .catch(error => console.error(error))
}

// Change Course

export const ChangeCourse = async(token, id, reload) => {
    return await fetch(`${API}/user/course/change/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success === true) {
            reload.go()
        }
    })
    .catch(error => console.error(error))
}

// Change Course

export const getQuizz = async(token, slug, set) => {
    return await fetch(`${API}/user/quizz/get/${slug}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data?.success === false) {
            set(false)
        } else {
            set(data.quizz)
        }
    })
}

// PICPAY

let timer;

const checkOutRepeat = (setLoading, setRedirect, setPaid, token, subscription) => {
    checkOut(setLoading, setRedirect, setPaid, token, subscription)
    console.error('Pagamento não foi confirmado')
}

export const checkOut = async(setLoading, setRedirect, setPaid, token, subscription) => {
    return await fetch(`${API}/picpay/get/status/${subscription}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success === true) {
            setPaid(true)
            setLoading(true)
            clearTimeout(timer)
            setTimeout(() => {
                setRedirect(true)
            }, 3000)
        } else {
            return setTimeout(() => {
                timer = setTimeout(checkOutRepeat(setLoading, setRedirect, setPaid, token, subscription), 2500)
            }, 2500)
        }
    })
    .catch(async(error) => {
        return setTimeout(() => {
            console.error('Pagamento não foi confirmado')
            checkOut(setLoading, setRedirect, setPaid, token, subscription)
        }, 2500)
    })
}

export const picPay = async(token, cpf, phone, price, set, setQrCode, setPaid, setRedirect, setLoading) => {
    return await fetch(`${API}/picpay/pay`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            cpf: cpf,
            phone: phone,
            price: price
        })
    })
    .then(response => response.json())
    .then(data => {
        set({
            cpf: '',
            phone: '',
        })
        setQrCode(data.qrCode)
        checkOut(setLoading, setRedirect, setPaid, token, data.subscription)
    })
    .catch(error => console.error(error))
}

// DARK Mode

export const toggleBulb = async(toggle, current) => {

    const darkMode = {
        "--colorText": "#1F1F1F",
        "--colorTextLight": "#FFA000",
        "--buttonColor": "#FFA000",
        "--buttonText": "#1F1F1F",
        "--colorBackground": "#121212",
        "--colorTextHover": "#0e0e0e",
        "--weekBall": "#0e0e0e",
        "--weekBallBorder": "#1F1F1F",
        "--weekBallStudied": "#FFA000",
        "--colorTextOp": "#8f863470",
        "--grayComponent": "#161616",
        "--grayCard": "#1F1F1F",
        "--cardHover": "#1a1a1a",
        "--backgroundCard": "#161616",
        "--graySimple": "#1a1a1a",
        "--colorH": "#E0E0E0",
        "--colorMute": "#6c757d",
        "--wrongAnswer": "#b61818",
        "--light": "#00000015",
        "--rightAnswer": "#34a853",
        "--linkLive": "#1F1F1F",
        "--input": "#1F1F1F",
        "--inputBorder": "#0e0e0e",
        "--textLP": "#1F1F1F",
        "--cardSelected": "#1F1F1F",
        "--colorP": "#E0E0E0",
        "--backgroundSuccess": "#E0E0E0",
        "--barLesson": "#1F1F1F",
        "--barProgress": "#121212",
        "--choice": "#1F1F1F",
        "--ballChoice": "#121212",
        "--bottomLesson": "#1F1F1F",
        "--lessonButtonText": "#1F1F1F",
        "--lessonButtonBackColor": "#FFA000",
        "--rightColor": "#1F1F1F",
        "--rightBackground": "#FFA000"
    }

    if(toggle !== undefined) {

        const toggleMode = (await toggle()).mode

        if(toggleMode) {

            return Object.entries(darkMode).forEach((value) => {
                document.documentElement.style.setProperty(value[0], value[1]);
            })

        } else {

            return Object.entries(darkMode).forEach((value) => {
                document.documentElement.style.removeProperty(value[0]);
            })

        }
    } else {
        if(current) {

            return Object.entries(darkMode).forEach((value) => {
                document.documentElement.style.setProperty(value[0], value[1]);
            })

        }
    }

}

// Set Dark Mode in Local Storage

export const setDarkMode = async() => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('modeview')) {
            if(JSON.parse(localStorage.getItem('modeview'))?.mode === false) {
                localStorage.setItem('modeview', JSON.stringify({mode: true}))
            } else if (JSON.parse(localStorage.getItem('modeview'))?.mode === undefined) {
                localStorage.setItem('modeview', JSON.stringify({mode: true}))
            } else {
                localStorage.setItem('modeview', JSON.stringify({mode: false}))
            }
        } else {
            localStorage.setItem('modeview', JSON.stringify({mode: true}))
        }

        return await JSON.parse(localStorage.getItem('modeview'))
    }
}

export const GetDarkMode = () => {
    if(typeof window === 'undefined') {
        return false
    } else {
        if(localStorage.getItem('modeview')) {
            if(JSON.parse(localStorage.getItem('modeview')).mode === false) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }
}