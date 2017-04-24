import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyCgis45GkKpCahIFd3Zr4-Uc3b4_ffMwc4';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { videos: [],
      selectedVideo: null
    };
    YTSearch({key: API_KEY, term: 'samsung s8'}, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      })
    });
  }
  render(){
    return (
      <div>
        <SearchBar />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo}) }
          videos={this.state.videos}/>
      </div>
    );
  }
}

// Take this component's html and put it in the DOM
ReactDOM.render(<App/>, document.querySelector('.container'));