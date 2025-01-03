import { memo, Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { titleMaxLength, urlMaxLength } from '@/constants'
import InputError from "@/parts/Input/InputError";
import { tv } from "tailwind-variants";
import { useForm } from 'react-hook-form';
import { createFlow } from '@/db/utils'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateFLowArgs, FlowType } from '@/types'
import { checkDummyAuthStatus } from '@/utils'

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};



const CreateModal = ({ isOpenModal, setIsOpenModal }: Props) => {

  const userId = checkDummyAuthStatus();

  const {
    register,
    handleSubmit,
    // setValue,
    // control,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: "kano",
      url: "shun"
    }
  });

  const queryClient = useQueryClient();
  const createFlowMutation = useMutation<FlowType, Error, CreateFLowArgs>({
    mutationFn: (data) => createFlow(data),
    onSuccess: (flow) => {
      setIsOpenModal(false)
      queryClient.setQueryData(['flows', userId], (oldFlows: FlowType[]) => {
        return [...oldFlows, flow]
      })
    }
  });

  const closeModal = () => setIsOpenModal(false);

  // const createFlow: FormEventHandler = (e) => {
  //   e.preventDefault();
  //   // post(route("flow.create"), {
  //   //   preserveScroll: true,
  //   //   onSuccess: () => closeModal(),
  //   //   onFinish: () => reset(),
  //   // });
  // };
  const inputTv = tv({
    base: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-11/12 placeholder-slate-300"
  });

  const labelTv = tv({
    base: "block font-medium text-sm text-gray-700"
  })

  const buttonTv = tv({
    base: "bg-indigo-500 py-2 px-3 text-white rounded shadow cursor-pointer transition-all hover:bg-indigo-600"
  })

  const errorTv = tv({
    base: "text-sm text-red-600"
  })




  const onSubmit = (data: { title: string, url: string }) => {

    createFlowMutation.mutate({
      userId: "1",
      title: data.title,
      url: data.url
    })
    // const res = await createFlow("1", data);
    // console.log(res)
  };

  return (
    <Modal show={isOpenModal} onClose={closeModal}>
      <form
        className="p-6"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <label
            htmlFor="title"
            className={labelTv()}>
            {`アンケートタイトル（${titleMaxLength}文字）`}
          </label>
          <input
            {...register('title', {
              required: true,
              maxLength: { value: titleMaxLength, message: "error message" },
            })}
            className={inputTv()}
          />
        </div>

        <div className="mt-10">
          <label
            htmlFor="url"
            className={labelTv()}>{`アンケートURL名（${urlMaxLength}文字）`}
          </label>

          <input
            {...register('url', {
              required: true,
              maxLength: { value: urlMaxLength, message: "error message" },
            })}
            className={inputTv()}
          />
          {errors.url && <div>入力が必須の項目です</div>}
          <p className={errorTv()}></p>
        </div>

        <div className="mt-12 flex justify-start">
          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className={buttonTv()}
          >
            作 成
          </button>
        </div>


      </form>
    </Modal>
  );
};

export default memo(CreateModal);




// import { FormEventHandler, memo, Dispatch, SetStateAction } from "react";
// import Modal from "./Modal";
// import { titleMaxLength, urlMaxLength } from '@/constants'
// import TextInput from "@/parts/Input/TextInput";
// import InputError from "@/parts/Input/InputError";
// import InputLabel from "@/parts/Input/InputLabel";

// import { useForm } from 'react-hook-form';

// type Props = {
//   isOpenModal: boolean;
//   setIsOpenModal: Dispatch<SetStateAction<boolean>>;
// };


// const CreateModal = ({ isOpenModal, setIsOpenModal }: Props) => {
//   //   const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
//   //     initialTitle: "",
//   //     initialUrl: "",
//   //   });

//   const createFlow: FormEventHandler = (e) => {
//     e.preventDefault();
//     // post(route("flow.create"), {
//     //   preserveScroll: true,
//     //   onSuccess: () => closeModal(),
//     //   onFinish: () => reset(),
//     // });
//   };

//   const closeModal = () => {
//     setIsOpenModal(false);
//   };

//   return (
//     <>
//       <Modal show={isOpenModal} onClose={closeModal}>
//         <form onSubmit={createFlow} className="p-6">
//           <div className="mt-6">
//             <InputLabel htmlFor="title" value={`アンケートタイトル（${titleMaxLength}文字）`} />
//             <TextInput
//               id="title"
//               type="text"
//               name="title"
//               value={"shun"}
//               onChange={() => { }}
//               className="mt-1 block w-11/12 placeholder-slate-300"
//               placeholder="タイトル" required
//               maxLength={titleMaxLength}
//             />
//           </div>

//           <div className="mt-10">
//             <InputLabel htmlFor="initialUrl" value={`アンケートURL名（${urlMaxLength}文字）`} />

//             <TextInput id="initialUrl" type="text" name="initialUrl" value={data.initialUrl} onChange={(e) => setData("initialUrl", e.target.value)} className="mt-1 block w-11/12 placeholder-slate-300" placeholder="URL" required maxLength={urlMaxLength} />
//             <InputError message={errors.initialUrl} className="mt-2" />
//           </div>


//           {/* <div className="mt-6">
//             <InputLabel htmlFor="initialTitle" value={`アンケートタイトル（${titleMaxLength}文字）`} />

//             <TextInput id="initialTitle" type="text" name="initialTitle" value={data.initialTitle} onChange={(e) => setData("initialTitle", e.target.value)} className="mt-1 block w-11/12 placeholder-slate-300" placeholder="タイトル" required maxLength={titleMaxLength} />
//             <InputError message={errors.initialTitle} className="mt-2" />
//           </div>

//           <div className="mt-10">
//             <InputLabel htmlFor="initialUrl" value={`アンケートURL名（${urlMaxLength}文字）`} />

//             <TextInput id="initialUrl" type="text" name="initialUrl" value={data.initialUrl} onChange={(e) => setData("initialUrl", e.target.value)} className="mt-1 block w-11/12 placeholder-slate-300" placeholder="URL" required maxLength={urlMaxLength} />
//             <InputError message={errors.initialUrl} className="mt-2" />
//           </div>

//           <div className="mt-12 flex justify-start">
//             <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600" disabled={processing}>
//               作 成
//             </button>
//           </div> */}
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default memo(CreateModal);
