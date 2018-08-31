(ns eventum-ui.core
  (:require [eventum-ui-components]
            [goog.object :as gobj]
            [reagent.core :as r]))

(def Avatar (r/adapt-react-class (gobj/get js/EventumUI "Avatar")))

(def Backdrop (r/adapt-react-class (gobj/get js/EventumUI "Backdrop")))

(def Grid (r/adapt-react-class (gobj/get js/EventumUI "Grid")))
(def Col (r/adapt-react-class (gobj/get js/EventumUI "Col")))
(def ColRight (r/adapt-react-class (gobj/get js/EventumUI "ColRight")))
(def ColWidths (r/adapt-react-class (gobj/get js/EventumUI "ColWidths")))

(def Header (r/adapt-react-class (gobj/get js/EventumUI "Header")))

(def ButtonBordered (r/adapt-react-class (gobj/get js/EventumUI "ButtonBordered")))
(def LinkButton (r/adapt-react-class (gobj/get js/EventumUI "LinkButton")))

(def MainContent (r/adapt-react-class (gobj/get js/EventumUI "MainContent")))
