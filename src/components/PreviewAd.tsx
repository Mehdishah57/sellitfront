import React from 'react';

interface Props{
  localState: any
  submitForm: ()=>void
}

const PreviewAd: React.FC<Props> = ({ localState, submitForm }) => {
  const handleSubmit = () => {
    submitForm()
  }
  return (
    <div className="previewad-wrapper">
      <button onClick={handleSubmit}>Post Ad</button>
    </div>
  )
}

export default PreviewAd;
