(defproject eventum-ui-components "4.0.0"
  :source-paths ["src-cljs"]
  :dependencies [[reagent "0.8.1" :scope "provided"]]
  :plugins [[s3-wagon-private "1.3.2"]]
  :repositories [["releases" {:url "s3p://eventum-mvn-repo/releases/" :no-auth true}
                  "snapshots" {:url "s3p://eventum-mvn-repo/snapshots/" :no-auth true}]])
