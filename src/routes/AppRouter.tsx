import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecommendWalkRoadPage } from "../pages/RecommendWalkRoadPage.tsx";
import {
  SignInPage,
  SignUpPage,
  PostDogPageWithSignUp,
  PostDogPage,
  MatchPage,
  MyPage,
  UserProfileUpdatePage,
  DogProfileUpdatePage,
  AlertPage,
  CommunityPage,
  PostPage,
  PostWritePage,
  PostFixPage,
  ChatListPage,
  WhoLikeDetailPage,
  TrailListPage,
  ChatPage,
} from "../pages";
import { TrailWritePage } from "../pages/TrailWritePage";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/find-walk-road" element={<RecommendWalkRoadPage />} />
        <Route path="/postdog" element={<PostDogPageWithSignUp />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/profile" element={<UserProfileUpdatePage />} />
        <Route
          path="/mypage/dogprofile/:dogId"
          element={<DogProfileUpdatePage />}
        />
        <Route path="/mypage/postdog" element={<PostDogPage />} />
        <Route path="/post" element={<CommunityPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/post-write" element={<PostWritePage />} />
        <Route path="/post-fix/:postId" element={<PostFixPage />} />
        <Route path="/chatlist" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/wholike" element={<WhoLikeDetailPage />} />
        <Route path="/trail/:trailId/review" element={<TrailListPage />} />
        <Route path="/trail-write/:trailId" element={<TrailWritePage />} />
      </Routes>
    </BrowserRouter>
  );
};
