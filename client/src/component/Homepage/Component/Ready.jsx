import { Button } from "@/components/ui/button";
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import pic from "/Images/pexels-buro-millennial-1438084.jpg";
// import logo from '../assets/pexels-buro-millennial-1438084.jpg'
function Ready() {
  return (
    <div>
      <div
        className="grid grid-cols-2 max-md:grid-cols-1
      m-8 max-w-screen-lg max-sm:mx-0 place-items-center py-24"
      >
        <img
          alt="a picture"
          src="/Images/pexels-buro-millennial-1438084.jpg"
          loading="lazy"
          className=" rounded-l-[50px] block "
        />
        <Card
          className={cn(
            "mx-4 my-2 px-8 py-12 font-san shadow-lg border max-sm:mx-0"
          )}
        >
          <motion.p
            className=" font-sans"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="my-4">
              {" "}
              <b>About, Mental health</b>{" "}
            </div>
            Mental health is a level of psychological well-being or an absence
            of mental illness. It's the psychological state of someone who is
            functioning at a satisfactory level of emotional and behavioural
            adjustment. It includes subjective well-being, perceived
            self-efficacy, autonomy, competence, inter-generational dependence,
            and self-actualization of one's intellectual and emotional
            potential, among others.
            <br />
            <Button className="w-fit my-12">
              <a
                href="https://dreamingechoes.github.io/awesome-mental-health/#/"
                target="blank"
              >
                Get Resources
              </a>
            </Button>
          </motion.p>
        </Card>
      </div>
      <section className="">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <motion.p
            className=" font-sans text-center"
            initial={{
              opacity: 0,
              x: 50,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="font-light  sm:text-lg ">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold ">
                Why Choose SafeMic
              </h2>
              <p className="mb-4">
                Empowerment: We believe in the power of your voice. By speaking
                up and seeking help, you're taking the first step towards
                positive change and personal growth.
              </p>
              <p>
                Confidentiality: Your privacy is of utmost importance to us.
                Rest assured that any information you share with us will be kept
                confidential and handled with the utmost care.
              </p>
              <p>
                Dedicated Support: Our team is committed to providing you with
                the support and resources you need to overcome obstacles and
                thrive in your academic and personal life.
              </p>
            </div>
          </motion.p>
          <motion.p
            className=" font-sans text-center"
            initial={{
              opacity: 0,
              y: 0,
              x: 0,
            }}
            whileInView={{
              opacity: 1,
              y: 50,
              x: 50,
            }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src="/Images/man-1276384_1280.jpg"
                alt="office content 2"
              />
              <img
                className="w-full rounded-lg"
                src="/Images/pexels-kaique-rocha-290627.jpg"
                alt="office content 1"
              />
            </div>
          </motion.p>
        </div>
      </section>
      <div className="my-24">
        <section className="">
          <motion.p
            className=" font-sans text-center"
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
              <dl className="grid max-w-screen-md gap-8 mx-auto sm:grid-cols-3 d">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    8
                  </dt>
                  <dd className="font-light ">Developers</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    10+
                  </dt>
                  <dd className="font-light  ">Contributors</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    1
                  </dt>
                  <dd className="font-light ">Organizations</dd>
                </div>
              </dl>
            </div>
          </motion.p>
        </section>
      </div>
    </div>
  );
}

export default Ready;
