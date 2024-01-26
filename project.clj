(defproject eventum/ui-components "4.6.7"
  :source-paths ["src-cljs"]
  :dependencies [[reagent "0.8.1" :scope "provided"]]
  :repositories {"github" {:url "https://maven.pkg.github.com/bigsackch/ui-components"
                           :username "private-token"
                           :password :env/GITHUB_TOKEN
                           :sign-releases false}})
