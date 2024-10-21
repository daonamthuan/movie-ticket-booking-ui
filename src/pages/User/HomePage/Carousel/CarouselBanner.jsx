import Carousel from "react-material-ui-carousel";
import Item from "./Item";

function CarouselBanner(props) {
    var items = [
        // {
        //     image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728735064/p3yomqfcevs70ajlxuyd.jpg",
        //     title: "Transformer",
        // },
        // {
        //     image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728735126/srbynzccezkejwtvi5rl.jpg",
        //     description: "Cám chuyện chưa kể",
        // },
        {
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728738362/iw2hvkuk0tfbujhzzclf.png",
            description: "Cô dâu hồi môn",
        },
        {
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1728752959/ybblerxvw0ppikypw3y7.jpg",
            description: "Quỷ ăn tạng",
        },
        {
            image: "https://res.cloudinary.com/dquwkvuyh/image/upload/v1729505765/tnbgxwthlhymidkm3hcs.jpg",
            description: "Venom: Kèo cuối",
        },
    ];

    return (
        <Carousel
            navButtonsAlwaysVisible={true}
            IndicatorIconButtonProps={{
                style: {
                    position: "absolute",
                    bottom: "15px",
                    zIndex: 1,
                    color: "#fff",
                },
            }}
            indicatorContainerProps={{
                style: {
                    position: "absolute",
                    bottom: "15px",
                    zIndex: 1,
                },
            }}
        >
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Carousel>
    );
}

export default CarouselBanner;
