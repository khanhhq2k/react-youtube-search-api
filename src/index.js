import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyCgis45GkKpCahIFd3Zr4-Uc3b4_ffMwc4';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { videos: [],
      selectedVideo: null
    };
    this.videoSearch('samsung s8');
  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      })
    });
  }
  render(){
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 1000);
    return (
      <div>
        <SearchBar onSearchTermChange={ videoSearch }/>
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