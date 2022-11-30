import RecruitCardView from '@components/recruit/index/RecruitCardView';
import RecruitHeader from '@components/recruit/index/RecruitHearder';
import RecruitTags from '@components/recruit/index/RecruitTags';
import styled from '@emotion/styled';
import useRecruitQuery from '@hooks/query/recruit/useRecruitQuery';
import useRecruitTagQuery from '@hooks/query/recruit/useRecruitTagQuery';
import filterTagJoinUrl from '@utils/filterTagJoinUrl';
import { useState } from 'react';

export interface TagsIdState {
  tagIds: number[];
}

export default function Recruit() {
  const [searchFilterTagNames, setSearchFilterTagNames] = useState<string[]>(['회사 이름']);
  const [searchBarFilterInput, setSearchBarFilterInput] = useState<string>('');
  const [tagsId, setTagsId] = useState<TagsIdState>({
    tagIds: [],
  });

  const requestURL = filterTagJoinUrl(searchFilterTagNames, tagsId, searchBarFilterInput);

  const { data: jobLists } = useRecruitQuery(requestURL);
  const { data: tagLists } = useRecruitTagQuery();

  return (
    <RecruitWrapper>
      <RecruitContainer>
        <RecruitHeader
          tagsId={tagsId}
          searchFilterTagNames={searchFilterTagNames}
          setSearchFilterTagNames={setSearchFilterTagNames}
          setSearchBarFilterInput={setSearchBarFilterInput}
          searchBarFilterInput={searchBarFilterInput}
        />
      </RecruitContainer>
      <RecruitLine />
      <RecruitTags
        tags={tagLists?.result}
        tagsId={tagsId}
        setTagsId={setTagsId}
        searchFilterTagNames={searchFilterTagNames}
        searchBarFilterInput={searchBarFilterInput}
      />
      <RecruitContentContainer>
        {jobLists?.result[0]?.length === 0 ? (
          <RecruitSearchNoContent>검색 결과가 존재하지 않습니다.</RecruitSearchNoContent>
        ) : (
          jobLists?.result[0]
            ?.filter((el: any) => el.isActive === true)
            .map((job: any, idx: number) => (
              <RecruitCardView
                key={idx}
                company={job.company}
                title={job.title}
                address={job.address.mainAddress}
                jobId={job.jobId}
                images={job.image[0]}
              />
            ))
        )}
      </RecruitContentContainer>
    </RecruitWrapper>
  );
}

const RecruitWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const RecruitContainer = styled.div`
  margin: 0 auto;
  width: 90vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const RecruitSearchNoContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: rgb(102, 102, 102);

  @media screen and (min-width: 320px) and (max-width: 768px) {
    top: 75%;
  }
`;

const RecruitLine = styled.hr`
  width: 90vw;
  margin-top: 14px;
`;

const RecruitContentContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`;
