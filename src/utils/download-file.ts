const downloadFile = (file: any, fileName: string) => {
  const blob = new Blob([file])
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default downloadFile
