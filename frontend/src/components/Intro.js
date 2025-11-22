import { motion } from "framer-motion";

function Intro() {
  return (
    <div className="flaco-logo flex h-screen items-center justify-center">
      <motion.h1
        className="text-center font-roboto text-9xl font-extrabold"
        initial={{ opacity: 1, color: "#950606" }}
        animate={{ opacity: 0, color: "#282c34" }}
        transition={{ duration: 1.5,
                      repeat: 2,
                      repeatType: "reverse"
        }}
      >
        FLACO
      </motion.h1>
    </div>
  );
}

export default Intro;

