import Container from "../components/Container";

const Login = () => {
  return (
    <div className="">
      <Container>
        <div className="w-full">
          <div className="flex flex-col max-w-3xl mx-auto border-2 border-stone-300">
            <h1 className=" mb-[1em] text-3xl">Log in</h1>
            <h2 className="text-2xl italic">
              Get inspired and add some elements to your life
            </h2>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
