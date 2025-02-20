import { PathApi, Point } from '@udecode/plate';
import { PlateEditor } from '@udecode/plate/react';

export const getCaretPathFromSelection = (editor: PlateEditor): Point => {
  return editor.selection?.anchor ?? { path: [0], offset: 0 };
  //   const anchorPath = editor.selection?.anchor.path;
  //   const focusPath = editor.selection?.focus.path;
  //   const currentPath =
  //     anchorPath && focusPath
  //       ? PathApi.compare(anchorPath, focusPath) > 0
  //         ? anchorPath
  //         : focusPath
  //       : [0];
  //   return { path: currentPath, offset: 0 };
};
