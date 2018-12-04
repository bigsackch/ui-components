(ns eventum-ui.core
  (:require [eventum-ui-components]
            [goog.object :as gobj]
            [reagent.core :as r]
            [reagent.impl.template :as rtpl]))

(def Avatar (r/adapt-react-class (gobj/get js/EventumUI "Avatar")))

(def Backdrop (r/adapt-react-class (gobj/get js/EventumUI "Backdrop")))

(def CopyrightFooter (r/adapt-react-class (gobj/get js/EventumUI "CopyrightFooter")))

(def Label (r/adapt-react-class (gobj/get js/EventumUI "Label")))

(def LocaleSelectorWithState (r/adapt-react-class (gobj/get js/EventumUI "LocaleSelectorWithState")))

(def Grid (r/adapt-react-class (gobj/get js/EventumUI "Grid")))
(def Col (r/adapt-react-class (gobj/get js/EventumUI "Col")))
(def ColRight (r/adapt-react-class (gobj/get js/EventumUI "ColRight")))
(def ColWidths (r/adapt-react-class (gobj/get js/EventumUI "ColWidths")))

(def Header (r/adapt-react-class (gobj/get js/EventumUI "Header")))
(def HeaderLink (r/adapt-react-class (gobj/get js/EventumUI "HeaderLink")))
(def HeaderHostingMenu (r/adapt-react-class (gobj/get js/EventumUI "HeaderHostingMenu")))

(def Button (r/adapt-react-class (gobj/get js/EventumUI "Button")))

(def MainContent (r/adapt-react-class (gobj/get js/EventumUI "MainContent")))

(def Modal (r/adapt-react-class (gobj/get js/EventumUI "Modal")))

(def ModalCloseButton (r/adapt-react-class (gobj/get js/EventumUI "ModalCloseButton")))

(def Checkbox (r/adapt-react-class (gobj/get js/EventumUI "Checkbox")))
(def Radio (r/adapt-react-class (gobj/get js/EventumUI "Radio")))
(def CheckboxGroup (r/adapt-react-class (gobj/get js/EventumUI "CheckboxGroup")))
(def RadioGroup (r/adapt-react-class (gobj/get js/EventumUI "RadioGroup")))

(def input-component (r/reactify-component
                       (fn [props]
                         [:input props])))

(def textarea-component (r/reactify-component
                          (fn [props]
                            [:textarea props])))

(defn TextInput [props & children]
  (let [props (-> props
                  (assoc :inputComponent input-component)
                  rtpl/convert-prop-value)]
    (apply r/create-element (gobj/get js/EventumUI "TextInput") props (map r/as-element children))))

(defn NumberInput [props & children]
      (let [props (-> props
                      (assoc :inputComponent input-component)
                      rtpl/convert-prop-value)]
           (apply r/create-element (gobj/get js/EventumUI "NumberInput") props (map r/as-element children))))

(defn TelInput [props & children]
      (let [props (-> props
                      (assoc :inputComponent input-component)
                      rtpl/convert-prop-value)]
           (apply r/create-element (gobj/get js/EventumUI "TelInput") props (map r/as-element children))))

(defn EmailInput [props & children]
      (let [props (-> props
                      (assoc :inputComponent input-component)
                      rtpl/convert-prop-value)]
           (apply r/create-element (gobj/get js/EventumUI "EmailInput") props (map r/as-element children))))

(defn Textarea [props & children]
  (let [props (-> props
                  (assoc :inputComponent textarea-component)
                  rtpl/convert-prop-value)]
    (apply r/create-element (gobj/get js/EventumUI "Textarea") props (map r/as-element children))))

(def Select (r/adapt-react-class (gobj/get js/EventumUI "Select")))
