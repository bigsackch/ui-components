(ns eventum-ui.core
  (:require [eventum-ui-components]
            [goog.object :as gobj]
            [reagent.core :as r]))

(def Avatar (r/adapt-react-class (gobj/get js/EventumUI "Avatar")))

(def Backdrop (r/adapt-react-class (gobj/get js/EventumUI "Backdrop")))

(def CopyrightFooter (r/adapt-react-class (gobj/get js/EventumUI "CopyrightFooter")))

(def Label (r/adapt-react-class (gobj/get js/EventumUI "Label")))
(def TextInput (r/adapt-react-class (gobj/get js/EventumUI "TextInput")))
(def Textarea (r/adapt-react-class (gobj/get js/EventumUI "Textarea")))

(def Grid (r/adapt-react-class (gobj/get js/EventumUI "Grid")))
(def Col (r/adapt-react-class (gobj/get js/EventumUI "Col")))
(def ColRight (r/adapt-react-class (gobj/get js/EventumUI "ColRight")))
(def ColWidths (r/adapt-react-class (gobj/get js/EventumUI "ColWidths")))

(def Header (r/adapt-react-class (gobj/get js/EventumUI "Header")))

(def Button (r/adapt-react-class (gobj/get js/EventumUI "Button")))

(def MainContent (r/adapt-react-class (gobj/get js/EventumUI "MainContent")))
