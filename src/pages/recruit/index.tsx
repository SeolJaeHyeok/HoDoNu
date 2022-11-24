import recruitListApi from '@apis/recruit/list';
import RecruitCardView from '@components/recruit/index/RecruitCardView';
import RecruitHeader from '@components/recruit/index/RecruitHearder';
import RecruitTags from '@components/recruit/index/RecruitTags';
import styled from '@emotion/styled';
import { RecruitProps } from '@interfaces/recruit/list/list';
import { useState } from 'react';

export interface TagsIdState {
  tagIds: number[];
}

export default function Recruit({ jobList, tagList }: RecruitProps) {
  const [jobLists, setJobLists] = useState(jobList);
  const [searchFilterTagNames, setSearchFilterTagNames] = useState<string[]>(['회사 이름']);
  const [searchBarFilterInput, setSearchBarFilterInput] = useState<string>('');
  const [tagsId, setTagsId] = useState<TagsIdState>({
    tagIds: [],
  });

  return (
    <RecruitWrapper>
      {/* <RecruitContainer>
        <RecruitHeader
          tagsId={tagsId}
          setJobLists={setJobLists}
          searchFilterTagNames={searchFilterTagNames}
          setSearchFilterTagNames={setSearchFilterTagNames}
          setSearchBarFilterInput={setSearchBarFilterInput}
          searchBarFilterInput={searchBarFilterInput}
        />
      </RecruitContainer> */}
      <RecruitLine />
      <RecruitTags
        tags={tagList}
        setJobList={setJobLists}
        tagsId={tagsId}
        setTagsId={setTagsId}
        searchFilterTagNames={searchFilterTagNames}
        searchBarFilterInput={searchBarFilterInput}
      />
      <RecruitContentContainer>
        {jobLists.length === 0 ? (
          <RecruitSearchNoContent>검색 결과가 존재하지 않습니다.</RecruitSearchNoContent>
        ) : (
          jobLists
            ?.filter(el => el.isActive === true)
            .map((job, idx: number) => (
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

export async function getServerSideProps() {
  const { data } = await recruitListApi.getRecruitData();
  const res = await recruitListApi.getRecruitTagData();

  if (!data) {
    return { notFound: true };
  }

  if (!res) {
    return { notFound: true };
  }

  return {
    props: {
      jobList: data.result[0],
      tagList: res.data.result,
    },
  };
}

const RecruitWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const RecruitContainer = styled.div`
  margin: 0 auto;
  width: 1350px;
  display: flex;
  justify-content: space-around;
`;

const RecruitSearchNoContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: rgb(102, 102, 102);
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
