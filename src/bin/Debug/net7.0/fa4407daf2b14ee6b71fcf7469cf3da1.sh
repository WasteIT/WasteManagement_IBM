function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 70364;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 70364 > /dev/null;
done;

for child in $(list_child_processes 70369);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/juliusdalsgaardbertelsen/Documents/ITU/WasteIT/WasteManagement_IBM/src/bin/Debug/net7.0/fa4407daf2b14ee6b71fcf7469cf3da1.sh;
