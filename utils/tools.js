// 加载...显示
function showLoading(msg) {
    uni.showLoading({
        title: msg,
        mask: true
    })
}

// 加载...隐藏
function hideLoading() {
    uni.hideLoading()
}

// 对话框
function showModal(title, content, confirmText, cancelText, confirmColor, cancelColor, showCancel, successcallback, failcallback) {
    uni.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        cancelText: cancelText,
        confirmColor: confirmColor,
        cancelColor: cancelColor,
        showCancel: showCancel,
        success(res) {
            if (res.confirm) {
                successcallback()
            } else {
                failcallback()
            }
        },
        fail(res) {
            if (res.confirm) {
                failcallback()
            }
        }
    })
}

//操作成功
function showSuccessToast(msg) {
    uni.showToast({
        title: msg,
        duration: 2000,
        icon: 'success',
    })
}

//操作失败
function showErrorToast(msg) {
    uni.showToast({
        title: msg,
        duration: 3000,
				icon:'none',
        image: ''
    })
}

module.exports = {
    showLoading,
    hideLoading,
    showModal,
    showErrorToast,
    showSuccessToast
}