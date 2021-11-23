import React from 'react'

const Galeria = () => {
    return (
        <div>
            <h2 className="text-center pb-5 m-auto">Galería de fotos</h2>
            <div class="row">
            <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg"
                class="w-100 shadow-1-strong rounded mb-4"
                alt=""
                />

                <img
                src="https://mdbootstrap.com/img/Photos/Vertical/mountain1.jpg"
                class="w-100 shadow-1-strong rounded mb-4"
                alt=""
                />
            </div>

            <div class="col-lg-4 mb-4 mb-lg-0">
                <img
                src="https://mdbootstrap.com/img/Photos/Vertical/mountain2.jpg"
                class="w-100 shadow-1-strong rounded mb-4"
                alt=""
                />

                <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg"
                class="w-100 shadow-1-strong rounded mb-4"
                alt=""
                />
            </div>

            <div class="col-lg-4 mb-4 mb-lg-0">
                <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg"
                class="w-100 shadow-1-strong rounded mb-4"
                alt=""
                />

                <img
                src="https://mdbootstrap.com/img/Photos/Vertical/mountain3.jpg"
                class="w-100 shadow-1-strong rounded mb-4"
                alt=""
                />
            </div>
            </div>    
        </div>
    )
}

export default Galeria
