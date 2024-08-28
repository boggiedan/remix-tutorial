import { createContext, useContext, useState, ReactNode, FC } from "react";

// Define the context types
type OverlayContextType = {
  showOverlay: (content: ReactNode) => void;
  hideOverlay: () => void;
  isVisible: boolean;
  content: ReactNode;
};

// Create the context with default values
const OverlayContext = createContext<OverlayContextType>({
  showOverlay: () => {},
  hideOverlay: () => {},
  isVisible: false,
  content: null,
});

export const OverlayProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const showOverlay = (content: ReactNode) => {
    setContent(content);
    setIsVisible(true);
  };

  const hideOverlay = () => {
    setContent(null);
    setIsVisible(false);
  };

  return (
    <OverlayContext.Provider
      value={{ showOverlay, hideOverlay, isVisible, content }}
    >
      {children}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button
              onClick={hideOverlay}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            {content}
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
