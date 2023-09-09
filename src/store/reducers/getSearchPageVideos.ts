import axios from "axios";
import {createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from "..";
import { YOUTUBE_DATA_URL } from "../../utils/constants";
import { parseData } from "../../utils";
import { HomePageVideos } from "../../Types";

const API_KEY=import.meta.env.VITE_YOUTUBE_DATA_API_KEY


export const getSearchPageVideos=createAsyncThunk(
    'youtubeApp/SearchPageVideos',
    async(isNext:boolean,{getState})=>{
        const {
            youtubeApp:{nextPageToken:nextPageTokenFromState,videos,searchTerm},
        }=getState() as RootState;

        const {
            data: { items, nextPageToken },
          } = await axios.get(
            `${YOUTUBE_DATA_URL}/search?&q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
                isNext ? `pageToken=${nextPageTokenFromState}` : ""}`
          );

        //   console.log({ items, nextPageTokenFromState, nextPageToken });
        const parsedData:HomePageVideos[]=await parseData(items);
        return {parsedData:[...videos,...parsedData],nextPageToken};
    }
)