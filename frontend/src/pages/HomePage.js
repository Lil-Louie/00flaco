import background from '../assets/background.jpg'

function HomePage(){
  return(
    <div 
      className="HomePage bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
        
    </div>
  );
}
export default HomePage;