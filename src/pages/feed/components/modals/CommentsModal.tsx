import { FC, useState, useEffect } from "react";
import { BsChat } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentsModal: FC<CommentsModalProps> = ({ isOpen, onClose }) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    console.log("Novo comentário:", newComment);
    setNewComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }

    if (e.key === "Escape") {
      console.log("teclei esc");
      onClose();
    }
  };

  useEffect(() => {
    setNewComment("");
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="z-10 bg-themeBlack p-4 rounded shadow-lg max-w-md w-full">
            <div className="flex justify-end mb-2">
              <button className="text-gray-500" onClick={onClose}>
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Comentários</h2>
            {/* Lista de Comentários */}
            {/* Adicione a lógica para exibir os comentários aqui */}
            {/* Novo Comentário */}
            <div className="h-px w-full my-4 bg-gray-600"></div>
            <div className="flex items-center mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Adicione um comentário..."
                className="w-full p-2 rounded focus:outline-none text-white bg-themeGrey"
              />
              <button
                onClick={handleAddComment}
                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Comentar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsModal;
