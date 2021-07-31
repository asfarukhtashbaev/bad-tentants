import React, { useContext } from 'react';
import UsersContext from '../context';
import { useParams } from 'react-router-dom';
import {Animated} from "react-animated-css";

const FullProfile = () => {
    const users = useContext(UsersContext)
    const { id } = useParams();
    const comments = [
        {
            name: "Elizabeth Holmes",
            image: "../images/7.jpg",
            time: "8 часов назад",
            comment: "Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле."
        },
        {
            name: "Geraldine Thompson",
            image: "../images/8.jpg",
            time: "12 часов назад",
            comment: "Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле."
        },
        {
            name: "Grace Holland",
            image: "../images/9.jpg",
            time: "1 день назад",
            comment: "Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле."
        },
    ]

    const renderComments = comments.map(function(comment, index) {
        return (
                <div className="comment"key={index}>
                    <img src={comment.image} alt="" />
                    <div className="comment-text">
                        <h3 className="comment-header">{comment.name} <span>{comment.time}</span></h3>
                        <h3>Оценка:</h3>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <p className="comment-body">
                            {comment.comment}
                        </p>
                    </div>
                </div>
           
        )
    })


    const findedUser = users.find(function (user, index) {
        if (user.id == id) {
            return user
        }

        return false
    })
    
    
    return ( 
        <main className="main">
            <div className="container">
            <div className="card">
                <h3 className="profile-title">Профиль {findedUser.name}  {findedUser.lastName}</h3>
                <div className="card-body">
                    <Animated animationIn="fadeIn" animationInDelay={300} isVisible={true}>
                        <img src={"."+findedUser.avatar} alt="" />
                    </Animated>
                    <div className="card-body__text">
                        <h1>{findedUser.name} {findedUser.lastName}</h1>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <span className="card-id">(id: {findedUser.id})</span>
                        <h3 className="card-date">{findedUser.birthDate} г.</h3>
                        <Animated animationIn="fadeIn" animationInDelay={500} isVisible={true}>
                            <p className="card-about"><h3>Обо мне:</h3>{findedUser.about}</p>
                        </Animated>
                    </div>
                </div>
            </div>
            <div className="comments">
                    <h3 className="comments__title">Отзывы</h3>
                    {renderComments}
            </div>
        </div>
        </main>
     );
}
 
export default FullProfile;