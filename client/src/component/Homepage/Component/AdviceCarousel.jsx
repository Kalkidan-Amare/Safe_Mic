import { Carousel,CarouselContent,CarouselNext,CarouselPrevious,CarouselItem } from "@/components/ui/carousel";
function AdviceCarousel(){
    const campusAdvice = [
        {
            category: "Motivation",
            advice: "Believe in yourself. You have the power to achieve your goals.",
        },
        {
            category: "Motivation",
            advice: "Stay focused on your dreams, but don't forget to enjoy the journey.",
        },
        {
            category: "Motivation",
            advice: "Embrace challenges as opportunities for growth.",
        },
        {
            category: "Motivation",
            advice: "Surround yourself with positive influences that uplift and inspire you.",
        },
        {
            category: "Health",
            advice: "Prioritize your sleep. Aim for 7-9 hours each night for optimal performance.",
        },
        {
            category: "Health",
            advice: "Stay hydrated. Carry a reusable water bottle and drink plenty of water throughout the day.",
        },
        {
            category: "Health",
            advice: "Make time for physical activity. Even a short walk or workout can boost your mood and energy levels.",
        },
        {
            category: "Health",
            advice: "Eat a balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains.",
        },
        {
            category: "Motivation",
            advice: "Celebrate your successes, no matter how small. You're making progress!",
        },
        {
            category: "Motivation",
            advice: "Stay curious and keep learning. Knowledge is power.",
        }
    ];
    
    
    return<Carousel className="my-36">
        
        <CarouselContent className=" w-64 sm:w-80 md:w-[480px] lg:w-[800px]">
            {
                campusAdvice.map((advice,index)=>{
                    return <CarouselItem key={index}>
                    <div className="flex justify-center p-1 m-4">
                            <p className=" text-center font-semibold text-lg">
                                {advice.advice}
                            </p>
                    </div>
                </CarouselItem>
            })
    }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
    </Carousel>
}
export default AdviceCarousel;