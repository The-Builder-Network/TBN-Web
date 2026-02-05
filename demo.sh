#!/bin/bash
# Smart Auto Commit Splitter (Long Messages)
# Usage: ./auto_commit_split_smart_longmsg.sh <num_of_commits>
# Example: ./auto_commit_split_smart_longmsg.sh 80

if [ -z "$1" ]; then
  echo "❌ Please specify number of commits. Example: ./auto_commit_split_smart_longmsg.sh 80"
  exit 1
fi

NUM_COMMITS=$1

FILES=($(git ls-files --modified --others --exclude-standard))
TOTAL_FILES=${#FILES[@]}

if [ $TOTAL_FILES -eq 0 ]; then
  echo "✅ No unstaged files found."
  exit 0
fi

if [ $TOTAL_FILES -lt $NUM_COMMITS ]; then
  NUM_COMMITS=$TOTAL_FILES
fi

echo "📦 Found $TOTAL_FILES unstaged files. Creating $NUM_COMMITS commits..."
FILES_PER_COMMIT=$(( ($TOTAL_FILES + $NUM_COMMITS - 1) / $NUM_COMMITS ))

# --- Guess commit type ---
get_commit_type() {
  local f=$1
  if [[ $f == *"README"* || $f == *.md ]]; then echo "docs"
  elif [[ $f == *"package.json"* || $f == *"requirements.txt"* || $f == *"yarn.lock"* ]]; then echo "deps"
  elif [[ $f == *"config"* || $f == *".env"* ]]; then echo "config"
  elif [[ $f == *"test"* || $f == *__tests__* ]]; then echo "test"
  elif [[ $f == *"fix"* || $f == *"bug"* ]]; then echo "fix"
  elif [[ $f == *".css"* || $f == *".scss"* || $f == *".html"* ]]; then echo "style"
  elif [[ $f == *"src/"* || $f == *"app/"* || $f == *"controllers/"* || $f == *"models/"* ]]; then echo "feat"
  elif [[ $f == *".github/"* || $f == *".vscode/"* ]]; then echo "chore"
  else echo "refactor"
  fi
}

# --- Guess commit scope ---
get_scope() {
  local f=$1
  case "$f" in
    *auth*|*login*|*user*) echo "auth" ;;
    *payment*|*transaction*|*order*|*checkout*) echo "payment" ;;
    *product*|*item*|*inventory*) echo "product" ;;
    *dashboard*|*ui*|*view*|*component*|*page*) echo "ui" ;;
    *api*|*service*|*endpoint*|*controller*) echo "api" ;;
    *config*|*.env*|*setting*|*dotenv*) echo "config" ;;
    *readme*|*.md*) echo "readme" ;;
    *test*|*spec*|*mock*) echo "test" ;;
    *script*|*cli*|*tool*) echo "cli" ;;
    *database*|*schema*|*model*|*migration*) echo "db" ;;
    *hook*|*middleware*) echo "middleware" ;;
    *style*|*.css*|*.scss*) echo "style" ;;
    *) echo "misc" ;;
  esac
}

# --- Extended message vocab ---
verbs=("update" "refactor" "improve" "optimize" "revise" "clean up" "enhance" "simplify" "implement" "adjust" "modify" "tune" "restructure")
nouns=("logic" "code structure" "workflow handling" "component rendering" "data models" "response handling" "API layer" "UI components" "build configuration" "error handling" "schema structure" "controller flow" "integration layer")
details=("for better stability" "to match new structure" "for improved readability" "to fix inconsistencies" "to align with standards" "for consistent performance" "with cleaner separation" "to handle edge cases" "to improve user experience" "with minor design tweaks")

index=0
commit_count=0

while [ $index -lt $TOTAL_FILES ] && [ $commit_count -lt $NUM_COMMITS ]; do
  subset=("${FILES[@]:$index:$FILES_PER_COMMIT}")
  index=$((index + FILES_PER_COMMIT))
  git add "${subset[@]}" >/dev/null 2>&1

  declare -A type_count
  declare -A scope_count

  for f in "${subset[@]}"; do
    t=$(get_commit_type "$f")
    s=$(get_scope "$f")
    ((type_count[$t]++))
    ((scope_count[$s]++))
  done

  commit_type=$(for k in "${!type_count[@]}"; do echo "${type_count[$k]} $k"; done | sort -nr | head -1 | awk '{print $2}')
  commit_scope=$(for k in "${!scope_count[@]}"; do echo "${scope_count[$k]} $k"; done | sort -nr | head -1 | awk '{print $2}')

  [[ "$commit_scope" == "" ]] && commit_scope="misc"

  # Generate longer natural message (5-6 words)
  verb=${verbs[$((RANDOM % ${#verbs[@]}))]}
  noun=${nouns[$((RANDOM % ${#nouns[@]}))]}
  detail=${details[$((RANDOM % ${#details[@]}))]}

  message="$commit_type($commit_scope): $verb $noun $detail"

  git commit -m "$message" >/dev/null 2>&1

  echo "✅ Commit $((commit_count + 1)): $message"
  commit_count=$((commit_count + 1))
done

echo "🎉 Done! Created $commit_count commits."
