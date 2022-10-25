import { Component } from "react";

// export default function Spinner() {
//     return (
//         <div className='d-flex justify-content-center'>
//             <div className="spinner-border" role='status'>
//                 <span className='sr-only'></span>
//             </div>
//         </div>
//     )
// }

// tried functional components and class components

class Spinner extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div className="spinner-border" role='status'>
                    <span className='sr-only'></span>
                </div>
            </div>
        )
    }
}

export default Spinner;