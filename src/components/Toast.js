

export let ToastNotify = (props) => {
    return <>
        <div className="toast-container position-absolute top-0 end-0 p-3">
            <div id="toastBody" className="fade toast d-inline-block m-1 bg-success hide d-none" role="alert"
                 aria-live="assertive" aria-atomic="true">
                <div className="toast-header"><strong className="me-auto" id="toastTitle"></strong></div>
                <div className="success toast-body" id="toastMessage"></div>
            </div>
        </div>
    </>
}

export function RunToast(type, title, message) {
    document.querySelector('#toastTitle').innerHTML = title
    document.querySelector('#toastMessage').innerHTML = message
    document.querySelector('#toastBody').classList.remove('hide', 'd-none')
    document.querySelector('#toastBody').classList.add(type, 'show')
    setTimeout(() => {
        document.querySelector('#toastBody').classList.add('hide', 'd-none')
        document.querySelector('#toastBody').classList.remove(type, 'show')
    }, 2000)
}