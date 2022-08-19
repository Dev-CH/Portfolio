import './assets/App.css';
import { Galaxy } from './components';
import { CanvasProvider } from './context/CanvasContext';
import linkedIn from './assets/linkedIn.png';

function App() {
  return (
    <div className="App">
      <CanvasProvider>
          <Galaxy />
      </CanvasProvider>
      <div className={'social'}>
        <a
          href={'https://www.linkedin.com/in/chris-hammer-00'}
          rel={'noreferrer'}
          target={'_blank'}
        >
          <img 
            alt={'Chris Hammer Linked In'}
            src={linkedIn} 
          />
        </a>
        <p>Chris Hammer - Software Engineer</p>
      </div>
    </div>
  );
}

export default App;
