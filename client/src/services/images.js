import { httpCloudImage } from '@/_helpers'

const imageService = {}

imageService.upload = (image) => {
  const CLOUDINARY_UPLOAD_PRESET = 'mtraxsdg'
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  return httpCloudImage.post('/upload', formData)
    .then(res => res)
}

imageService.upload = (image) => {
  const CLOUDINARY_UPLOAD_PRESET = 'mtraxsdg'
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  return httpCloudImage.post('/upload', formData)
    .then(res => res)
}
export default imageService
