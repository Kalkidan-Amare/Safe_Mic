import useFetch from './useFetch';
import { CompaintTag } from './tailwind/ComplaintTag';

let tags = {
  grade_issue: 'grade issue',
  harassment_teacher: 'harasment by a teacher',
  harassment_student: 'harasment by a student',
  bullied: 'bullied',
  lounge: 'lounge',
  other: "other",
  all:'all'
}
import Loading from '@/component/Animation/Loading/Loading';
export const Fetcher = () => {
  const { isLoading, data } = useFetch('complaint/all-complaints/', true);

  if (isLoading) {
    return <div className="flex w-full justify-center"><Loading/>
            </div>
  }

  return (
    <>
    <div style={{flexWrap:'wrap'}} className='flex justify-center p-4 mt-12 '>
      {data?.data.map(val => <CompaintTag key={val.id} tag={tags[val.tag]} body={val.body} />)}
    </div>
    </>
  );
};
